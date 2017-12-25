resource "aws_sqs_queue" "queue" {
  name           = "${var.environment}-${var.name}"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "deadletter" {
  name = "${var.environment}-${var.name}-deadLetter"

  tags {
    environment = "${var.environment}"
  }
}
