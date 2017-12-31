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
  sns_publish_arns = ["${aws_sns_topic.save_theme.arn}", "${aws_sns_topic.publish_frontend.arn}"]

  environment_variables {
    JOB                        = "saveTheme"
    ALGOLIA_APP_ID             = "${var.algolia_app_id}"
    ALGOLIA_API_KEY            = "${var.algolia_api_key}"
    SAVE_THEME_TOPIC_ARN       = "${aws_sns_topic.save_theme.arn}"
    SAVE_THEME_QUEUE_URL       = "${aws_sqs_queue.save_theme.id}"
    SAVE_THEME_DEADLETTER_URL  = "${aws_sqs_queue.save_theme_deadletter.id}"
    PUBLISH_FRONTEND_TOPIC_ARN = "${aws_sns_topic.publish_frontend.arn}"
    PUBLISH_FRONTEND_QUEUE_URL = "${aws_sqs_queue.publish_frontend.id}"
  }
}

module "publish_frontend" {
  source           = "./lambda"
  name             = "publish_frontend"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.publish_frontend.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.publish_frontend.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.publish_frontend.arn}", "${aws_sqs_queue.publish_frontend_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.publish_frontend.arn}"]
  sns_publish_arns = ["${aws_sns_topic.publish_frontend.arn}"]

  environment_variables {
    JOB                             = "publishFrontend"
    PUBLISH_FRONTEND_TOPIC_ARN      = "${aws_sns_topic.publish_frontend.arn}"
    PUBLISH_FRONTEND_QUEUE_URL      = "${aws_sqs_queue.publish_frontend.id}"
    PUBLISH_FRONTEND_DEADLETTER_URL = "${aws_sqs_queue.publish_frontend_deadletter.id}"
  }
}

module "run_all" {
  source                  = "./lambda"
  name                    = "run_all"
  environment             = "${var.environment}"
  cloudwatch_trigger_name = "${aws_cloudwatch_event_rule.run_all.name}"
  cloudwatch_trigger_arn  = "${aws_cloudwatch_event_rule.run_all.arn}"

  sns_publish_arns = [
    "${aws_sns_topic.scrape_themes.arn}",
    "${aws_sns_topic.extract_themes.arn}",
    "${aws_sns_topic.extract_colors.arn}",
    "${aws_sns_topic.save_theme.arn}",
  ]

  environment_variables {
    JOB                      = "runAll"
    SCRAPE_THEMES_TOPIC_ARN  = "${aws_sns_topic.scrape_themes.arn}"
    EXTRACT_THEMES_TOPIC_ARN = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_COLORS_TOPIC_ARN = "${aws_sns_topic.extract_colors.arn}"
    SAVE_THEME_TOPIC_ARN     = "${aws_sns_topic.save_theme.arn}"
  }
}

module "init" {
  source                  = "./lambda"
  name                    = "init"
  environment             = "${var.environment}"
  cloudwatch_trigger_name = "${aws_cloudwatch_event_rule.init.name}"
  cloudwatch_trigger_arn  = "${aws_cloudwatch_event_rule.init.arn}"
  sqs_send_arns           = ["${aws_sqs_queue.scrape_themes.arn}"]

  environment_variables {
    JOB                     = "init"
    SCRAPE_THEMES_QUEUE_URL = "${aws_sqs_queue.scrape_themes.id}"
  }
}
