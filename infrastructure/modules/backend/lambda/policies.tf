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

data "aws_iam_policy_document" "cloudwatch_policy" {
  # Allow the lambda to output console.logs to CloudWatch.
  statement {
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "sns_publish_policy" {
  # SNS topics the lambda can publish to.
  statement {
    actions   = ["sns:Publish"]
    resources = ["${var.sns_publish_arns}"]
  }
}

data "aws_iam_policy_document" "sqs_receive_policy" {
  # SQS queues the lambda can receive messages from.
  statement {
    actions   = ["sqs:ReceiveMessage"]
    resources = ["${var.sqs_receive_arns}"]
  }
}

data "aws_iam_policy_document" "sqs_send_policy" {
  # SQS queues the lambda can send messages to.
  statement {
    actions   = ["sqs:SendMessage"]
    resources = ["${var.sqs_send_arns}"]
  }
}

data "aws_iam_policy_document" "sqs_delete_policy" {
  # SQS queues the lambda can delete messages from.
  statement {
    actions   = ["sqs:DeleteMessage"]
    resources = ["${var.sqs_delete_arns}"]
  }
}
