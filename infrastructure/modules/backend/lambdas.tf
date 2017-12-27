module "scrape_themes" {
  source           = "./lambda"
  name             = "scrape_themes"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.scrape_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.scrape_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.scrape_themes.arn}", "${aws_sqs_queue.scrape_themes_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.scrape_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.scrape_themes.arn}"]

  environment_variables {
    JOB                          = "scrapeThemes"
    SCRAPE_THEMES_TOPIC_ARN      = "${aws_sns_topic.scrape_themes.arn}"
    SCRAPE_THEMES_QUEUE_URL      = "${aws_sqs_queue.scrape_themes.id}"
    SCRAPE_THEMES_DEADLETTER_URL = "${aws_sqs_queue.scrape_themes_deadletter.id}"
  }
}

module "extract_themes" {
  source           = "./lambda"
  name             = "extract_themes"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.extract_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.extract_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.extract_themes.arn}", "${aws_sqs_queue.extract_themes_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.extract_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.extract_themes.arn}"]

  environment_variables {
    JOB                           = "extractThemes"
    EXTRACT_THEMES_TOPIC_ARN      = "${aws_sns_topic.extract_themes.arn}"
    EXTRACT_THEMES_QUEUE_URL      = "${aws_sqs_queue.extract_themes.id}"
    EXTRACT_THEMES_DEADLETTER_URL = "${aws_sqs_queue.extract_themes_deadletter.id}"
  }
}
