resource "aws_sqs_queue" "fetch_themes" {
  name           = "fetch_themes"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.fetch_themes_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "fetch_themes_deadletter" {
  name = "fetch_themes_deadletter"

  tags {
    environment = "${var.environment}"
  }
}
