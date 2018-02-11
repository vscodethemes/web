# Scrape themes.
resource "aws_sqs_queue" "scrape_extensions" {
  name                       = "scrape_extensions"
  visibility_timeout_seconds = "${var.sqs_visibility_timeout}"
  receive_wait_time_seconds  = "${var.sqs_receive_timeout}"
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.scrape_extensions_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "scrape_extensions_deadletter" {
  name = "scrape_extensions_deadletter"

  tags {
    environment = "${var.environment}"
  }
}

# Extract themes.
resource "aws_sqs_queue" "extract_themes" {
  name                       = "extract_themes"
  visibility_timeout_seconds = "${var.sqs_visibility_timeout}"
  receive_wait_time_seconds  = "${var.sqs_receive_timeout}"
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.extract_themes_deadletter.arn}\",\"maxReceiveCount\":4}"

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
  name                       = "extract_colors"
  visibility_timeout_seconds = "${var.sqs_visibility_timeout}"
  receive_wait_time_seconds  = "${var.sqs_receive_timeout}"
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.extract_colors_deadletter.arn}\",\"maxReceiveCount\":4}"

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

# Save theme.
resource "aws_sqs_queue" "save_theme" {
  name                       = "save_theme"
  visibility_timeout_seconds = "${var.sqs_visibility_timeout}"
  receive_wait_time_seconds  = "${var.sqs_receive_timeout}"
  redrive_policy             = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.save_theme_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    environment = "${var.environment}"
  }
}

resource "aws_sqs_queue" "save_theme_deadletter" {
  name = "save_theme_deadletter"

  tags {
    environment = "${var.environment}"
  }
}
