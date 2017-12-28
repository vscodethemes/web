# Scrape themes.
resource "aws_sqs_queue" "scrape_themes" {
  name           = "scrape_themes"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.scrape_themes_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "scrape_themes_deadletter" {
  name = "scrape_themes_deadletter"

  tags {
    environment = "${var.environment}"
  }
}

# Extract themes.
resource "aws_sqs_queue" "extract_themes" {
  name           = "extract_themes"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.extract_themes_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "extract_themes_deadletter" {
  name = "extract_themes_deadletter"

  tags {
    environment = "${var.environment}"
  }
}

# Extract colors.
resource "aws_sqs_queue" "extract_colors" {
  name           = "extract_colors"
  redrive_policy = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.extract_colors_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "extract_colors_deadletter" {
  name = "extract_colors_deadletter"

  tags {
    environment = "${var.environment}"
  }
}
