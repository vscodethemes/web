#####################
# CloudWatch Events #
#####################

resource "aws_cloudwatch_event_rule" "run_all" {
  name                = "run_all"
  schedule_expression = "rate(30 minutes)"
}

resource "aws_cloudwatch_event_rule" "init" {
  name                = "init"
  schedule_expression = "rate(${var.init_job_rate})"
}

##############
# SNS topics #
##############

resource "aws_sns_topic" "scrape_extensions" {
  name = "scrape_extensions"
}

resource "aws_sns_topic" "extract_themes" {
  name = "extract_themes"
}

resource "aws_sns_topic" "save_theme" {
  name = "save_theme"
}

##############
# SQS queues #
##############

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

###########
# Lambdas #
###########

module "init" {
  source                  = "./lambda"
  name                    = "init"
  package                 = "../../backend/build/backend.zip"
  handler                 = "job-handler.default"
  environment             = "${var.environment}"
  concurrency             = "${var.job_concurrency}"
  cloudwatch_trigger_name = "${aws_cloudwatch_event_rule.init.name}"
  cloudwatch_trigger_arn  = "${aws_cloudwatch_event_rule.init.arn}"
  sqs_send_arns           = ["${aws_sqs_queue.scrape_extensions.arn}"]

  environment_variables {
    HANDLER                     = "init"
    NODE_ENV                    = "production"
    SENTRY_DSN                  = "${var.sentry_dsn}"
    SCRAPE_EXTENSIONS_QUEUE_URL = "${aws_sqs_queue.scrape_extensions.id}"
  }
}

module "run_all" {
  source                  = "./lambda"
  name                    = "run_all"
  package                 = "../../backend/build/backend.zip"
  handler                 = "job-handler.default"
  environment             = "${var.environment}"
  concurrency             = "${var.job_concurrency}"
  cloudwatch_trigger_name = "${aws_cloudwatch_event_rule.run_all.name}"
  cloudwatch_trigger_arn  = "${aws_cloudwatch_event_rule.run_all.arn}"

  sns_publish_arns = [
    "${aws_sns_topic.scrape_extensions.arn}",
    "${aws_sns_topic.extract_themes.arn}",
    "${aws_sns_topic.save_theme.arn}",
  ]

  environment_variables {
    HANDLER                     = "runAll"
    NODE_ENV                    = "production"
    SENTRY_DSN                  = "${var.sentry_dsn}"
    SCRAPE_EXTENSIONS_TOPIC_ARN = "${aws_sns_topic.scrape_extensions.arn}"
    EXTRACT_THEMES_TOPIC_ARN    = "${aws_sns_topic.extract_themes.arn}"
    SAVE_THEME_TOPIC_ARN        = "${aws_sns_topic.save_theme.arn}"
  }
}

module "scrape_extensions" {
  source           = "./lambda"
  name             = "scrape_extensions"
  package          = "../../backend/build/backend.zip"
  handler          = "job-handler.default"
  environment      = "${var.environment}"
  concurrency      = "${var.job_concurrency}"
  sns_trigger_arn  = "${aws_sns_topic.scrape_extensions.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.scrape_extensions.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.scrape_extensions.arn}", "${aws_sqs_queue.scrape_extensions_deadletter.arn}", "${aws_sqs_queue.extract_themes.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.scrape_extensions.arn}"]
  sns_publish_arns = ["${aws_sns_topic.scrape_extensions.arn}", "${aws_sns_topic.extract_themes.arn}"]

  environment_variables {
    HANDLER                          = "scrapeExtensions"
    NODE_ENV                         = "production"
    SENTRY_DSN                       = "${var.sentry_dsn}"
    SCRAPE_EXTENSIONS_TOPIC_ARN      = "${aws_sns_topic.scrape_extensions.arn}"
    SCRAPE_EXTENSIONS_QUEUE_URL      = "${aws_sqs_queue.scrape_extensions.id}"
    SCRAPE_EXTENSIONS_DEADLETTER_URL = "${aws_sqs_queue.scrape_extensions_deadletter.id}"
    EXTRACT_THEMES_TOPIC_ARN         = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_THEMES_QUEUE_URL         = "${aws_sqs_queue.extract_themes.id}"
  }
}

module "extract_themes" {
  source           = "./lambda"
  name             = "extract_themes"
  package          = "../../backend/build/backend.zip"
  handler          = "job-handler.default"
  environment      = "${var.environment}"
  concurrency      = "${var.job_concurrency}"
  sns_trigger_arn  = "${aws_sns_topic.extract_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.extract_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.extract_themes.arn}", "${aws_sqs_queue.extract_themes_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.extract_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.extract_themes.arn}"]

  environment_variables {
    HANDLER                       = "extractThemes"
    NODE_ENV                      = "production"
    SENTRY_DSN                    = "${var.sentry_dsn}"
    EXTRACT_THEMES_TOPIC_ARN      = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_THEMES_QUEUE_URL      = "${aws_sqs_queue.extract_themes.id}"
    EXTRACT_THEMES_DEADLETTER_URL = "${aws_sqs_queue.extract_themes_deadletter.id}"
  }
}

module "save_theme" {
  source           = "./lambda"
  name             = "save_theme"
  package          = "../../backend/build/backend.zip"
  handler          = "job-handler.default"
  environment      = "${var.environment}"
  concurrency      = "${var.job_concurrency}"
  sns_trigger_arn  = "${aws_sns_topic.save_theme.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.save_theme.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.save_theme.arn}", "${aws_sqs_queue.save_theme_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.save_theme.arn}"]
  sns_publish_arns = ["${aws_sns_topic.save_theme.arn}"]

  environment_variables {
    HANDLER                   = "saveTheme"
    NODE_ENV                  = "production"
    SENTRY_DSN                = "${var.sentry_dsn}"
    ALGOLIA_APP_ID            = "${var.algolia_app_id}"
    ALGOLIA_API_KEY           = "${var.algolia_api_key}"
    ALGOLIA_INDEX             = "${var.algolia_index}"
    SAVE_THEME_TOPIC_ARN      = "${aws_sns_topic.save_theme.arn}"
    SAVE_THEME_QUEUE_URL      = "${aws_sqs_queue.save_theme.id}"
    SAVE_THEME_DEADLETTER_URL = "${aws_sqs_queue.save_theme_deadletter.id}"
  }
}
