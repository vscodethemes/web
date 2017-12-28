resource "aws_lambda_function" "lambda" {
  filename         = "../../build/lambda.zip"
  source_code_hash = "${base64sha256(file("../../build/lambda.zip"))}"
  function_name    = "${var.name}"
  role             = "${aws_iam_role.lambda.arn}"
  memory_size      = 128
  handler          = "build/backend/handler.default"
  runtime          = "nodejs6.10"

  # This should be a value greater than the SQS visibility timeout.
  timeout = 15

  # Limits our lambda function to only process one job at a time. 
  # For a recursive job, notifying itself before the execution of the current
  # function invocation completes will cause a 2nd concurrent job to created.
  # This isn't a bad thing, but we don't really need concurrency and makes 
  # the logs in CloudWatch harder to read because they are split up in a 
  # log stream for each invocation.
  reserved_concurrent_executions = 1

  environment {
    variables = "${var.environment_variables}"
  }

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.name}"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

resource "aws_iam_role_policy" "lambda" {
  name   = "${var.name}"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.lambda_policy.json}"
}

resource "aws_sns_topic_subscription" "subscription" {
  topic_arn = "${var.sns_trigger_arn}"
  protocol  = "lambda"
  endpoint  = "${aws_lambda_function.lambda.arn}"
}

resource "aws_lambda_permission" "sns" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda.arn}"
  principal     = "sns.amazonaws.com"
  source_arn    = "${var.sns_trigger_arn}"
}
