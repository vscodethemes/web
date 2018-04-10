resource "aws_lambda_function" "lambda" {
  filename         = "../../backend/build/backend.zip"
  source_code_hash = "${base64sha256(file("../../backend/build/backend.zip"))}"
  function_name    = "${var.name}"
  role             = "${aws_iam_role.lambda.arn}"
  memory_size      = 256
  handler          = "handler.default"
  runtime          = "nodejs6.10"

  # This should be a value greater than the SQS receive timeouts.
  timeout = 30

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

resource "aws_iam_role_policy" "cloudwatch_policy" {
  name   = "${var.name}_cloudwatch"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.cloudwatch_policy.json}"
}

resource "aws_iam_role_policy" "sns_publish_policy" {
  count  = "${length(var.sns_publish_arns) == 0 ? 0 : 1}"
  name   = "${var.name}_sns_publish"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.sns_publish_policy.json}"
}

resource "aws_iam_role_policy" "sqs_receive_policy" {
  count  = "${length(var.sqs_receive_arns) == 0 ? 0 : 1}"
  name   = "${var.name}_sqs_receive"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.sqs_receive_policy.json}"
}

resource "aws_iam_role_policy" "sqs_send_policy" {
  count  = "${length(var.sqs_send_arns) == 0 ? 0 : 1}"
  name   = "${var.name}_sqs_send"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.sqs_send_policy.json}"
}

resource "aws_iam_role_policy" "sqs_delete_policy" {
  count  = "${length(var.sqs_delete_arns) == 0 ? 0 : 1}"
  name   = "${var.name}_sqs_delete"
  role   = "${aws_iam_role.lambda.id}"
  policy = "${data.aws_iam_policy_document.sqs_delete_policy.json}"
}

resource "aws_sns_topic_subscription" "subscription" {
  count     = "${var.sns_trigger_arn != "" ? 1 : 0}"
  topic_arn = "${var.sns_trigger_arn}"
  protocol  = "lambda"
  endpoint  = "${aws_lambda_function.lambda.arn}"
}

resource "aws_lambda_permission" "sns" {
  count         = "${var.sns_trigger_arn != "" ? 1 : 0}"
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda.arn}"
  principal     = "sns.amazonaws.com"
  source_arn    = "${var.sns_trigger_arn}"
}

resource "aws_cloudwatch_event_target" "event_target" {
  count = "${var.cloudwatch_trigger_name != "" ? 1 : 0}"
  rule  = "${var.cloudwatch_trigger_name}"
  arn   = "${aws_lambda_function.lambda.arn}"
}

resource "aws_lambda_permission" "cloudwatch" {
  count         = "${var.cloudwatch_trigger_name != "" ? 1 : 0}"
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda.function_name}"
  principal     = "events.amazonaws.com"
  source_arn    = "${var.cloudwatch_trigger_arn}"
}
