resource "aws_lambda_function" "lambda" {
  filename         = "../../build/lambda.zip"
  source_code_hash = "${base64sha256(file("../../build/lambda.zip"))}"
  function_name    = "${var.environment}-${var.name}"
  memory_size      = 128
  timeout          = 10
  role             = "${aws_iam_role.lambda.arn}"
  handler          = "backend/handler.default"
  runtime          = "nodejs6.10"

  environment {
    variables = {
      JOB_NAME = "${var.name}"
    }
  }

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.environment}-${var.name}"
  assume_role_policy = "${data.aws_iam_policy_document.lambda.json}"
}

data "aws_iam_policy_document" "lambda" {
  # Allows AWS to execute the lambda function.
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}
