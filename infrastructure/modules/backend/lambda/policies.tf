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
  # Allow the lambda to output console.logs to CloudWatch.
  statement {
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["*"]
  }

  # SNS topics the lambda can publish to.
  statement {
    actions   = ["sns:Publish"]
    resources = ["${var.sns_publish_arns}"]
  }

  # SQS queues the lambda can receive messages from.
  statement {
    actions   = ["sqs:ReceiveMessage"]
    resources = ["${var.sqs_receive_arns}"]
  }

  # SQS queues the lambda can send messages to.
  statement {
    actions   = ["sqs:SendMessage"]
    resources = ["${var.sqs_send_arns}"]
  }

  # SQS queues the lambda can delete messages from.
  statement {
    actions   = ["sqs:DeleteMessage"]
    resources = ["${var.sqs_delete_arns}"]
  }
}
