resource "aws_lambda_function" "lambda" {
  filename         = "../../build/lambda.zip"
  source_code_hash = "${base64sha256(file("../../build/lambda.zip"))}"
  function_name    = "${var.name}"
  memory_size      = 128
  timeout          = 10
  role             = "${aws_iam_role.lambda.arn}"
  handler          = "build/backend/handler.default"
  runtime          = "nodejs6.10"

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

data "aws_iam_policy_document" "assume_role_policy" {
  # Allows AWS to execute the lambda function.
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "lambda_policy" {
  # SNS topics the lambda can publish to
  statement {
    actions   = ["sns:Publish"]
    resources = ["${var.sns_publish_arns}"]
  }

  # SQS queues the lambda can receive messages from
  statement {
    actions   = ["sqs:ReceiveMessage"]
    resources = ["${var.sqs_receive_arns}"]
  }

  # SQS queues the lambda can send messages to
  statement {
    actions   = ["sqs:SendMessage"]
    resources = ["${var.sqs_send_arns}"]
  }

  # SQS queues the lambda can delete messages from
  statement {
    actions   = ["sqs:DeleteMessage"]
    resources = ["${var.sqs_delete_arns}"]
  }
}
