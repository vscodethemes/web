module "scrape_themes" {
  source           = "./lambda"
  name             = "scrape_themes"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.scrape_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.scrape_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.scrape_themes.arn}", "${aws_sqs_queue.scrape_themes_deadletter.arn}", "${aws_sqs_queue.extract_themes.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.scrape_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.scrape_themes.arn}", "${aws_sns_topic.extract_themes.arn}"]

  environment_variables {
    JOB                          = "scrapeThemes"
    SCRAPE_THEMES_TOPIC_ARN      = "${aws_sns_topic.scrape_themes.arn}"
    SCRAPE_THEMES_QUEUE_URL      = "${aws_sqs_queue.scrape_themes.id}"
    SCRAPE_THEMES_DEADLETTER_URL = "${aws_sqs_queue.scrape_themes_deadletter.id}"
    EXTRACT_THEMES_TOPIC_ARN     = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_THEMES_QUEUE_URL     = "${aws_sqs_queue.extract_themes.id}"
  }
}

module "extract_themes" {
  source           = "./lambda"
  name             = "extract_themes"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.extract_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.extract_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.extract_themes.arn}", "${aws_sqs_queue.extract_themes_deadletter.arn}", "${aws_sqs_queue.extract_colors.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.extract_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.extract_themes.arn}", "${aws_sns_topic.extract_colors.arn}"]

  environment_variables {
    JOB                           = "extractThemes"
    EXTRACT_THEMES_TOPIC_ARN      = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_THEMES_QUEUE_URL      = "${aws_sqs_queue.extract_themes.id}"
    EXTRACT_THEMES_DEADLETTER_URL = "${aws_sqs_queue.extract_themes_deadletter.id}"
    EXTRACT_COLORS_TOPIC_ARN      = "${aws_sns_topic.extract_colors.arn}"
    EXTRACT_COLORS_QUEUE_URL      = "${aws_sqs_queue.extract_colors.id}"
    GITHUB_CLIENT_ID              = "${var.github_client_id}"
    GITHUB_CLIENT_SECRET          = "${var.github_client_secret}"
  }
}

module "extract_colors" {
  source           = "./lambda"
  name             = "extract_colors"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.extract_colors.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.extract_colors.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.extract_colors.arn}", "${aws_sqs_queue.extract_colors_deadletter.arn}", "${aws_sqs_queue.save_theme.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.extract_colors.arn}"]
  sns_publish_arns = ["${aws_sns_topic.extract_colors.arn}", "${aws_sns_topic.save_theme.arn}"]

  environment_variables {
    JOB                           = "extractColors"
    EXTRACT_COLORS_TOPIC_ARN      = "${aws_sns_topic.extract_colors.arn}"
    EXTRACT_COLORS_QUEUE_URL      = "${aws_sqs_queue.extract_colors.id}"
    EXTRACT_COLORS_DEADLETTER_URL = "${aws_sqs_queue.extract_colors_deadletter.id}"
    SAVE_THEME_TOPIC_ARN          = "${aws_sns_topic.save_theme.arn}"
    SAVE_THEME_QUEUE_URL          = "${aws_sqs_queue.save_theme.id}"
  }
}

module "save_theme" {
  source           = "./lambda"
  name             = "save_theme"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.save_theme.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.save_theme.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.save_theme.arn}", "${aws_sqs_queue.save_theme_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.save_theme.arn}"]
  sns_publish_arns = ["${aws_sns_topic.save_theme.arn}"]

  environment_variables {
    JOB                       = "saveTheme"
    SAVE_THEME_TOPIC_ARN      = "${aws_sns_topic.save_theme.arn}"
    SAVE_THEME_QUEUE_URL      = "${aws_sqs_queue.save_theme.id}"
    SAVE_THEME_DEADLETTER_URL = "${aws_sqs_queue.save_theme_deadletter.id}"
    ALGOLIA_APP_ID            = "${var.algolia_app_id}"
    ALGOLIA_API_KEY           = "${var.algolia_api_key}"
  }
}
