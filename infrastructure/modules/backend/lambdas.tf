module "fetch_themes" {
  source           = "./lambda"
  name             = "fetch_themes"
  environment      = "${var.environment}"
  sns_trigger_arn  = "${aws_sns_topic.fetch_themes.arn}"
  sqs_receive_arns = ["${aws_sqs_queue.fetch_themes.arn}"]
  sqs_send_arns    = ["${aws_sqs_queue.fetch_themes.arn}", "${aws_sqs_queue.fetch_themes_deadletter.arn}"]
  sqs_delete_arns  = ["${aws_sqs_queue.fetch_themes.arn}"]
  sns_publish_arns = ["${aws_sns_topic.fetch_themes.arn}"]

  environment_variables {
    JOB                         = "fetchThemes"
    FETCH_THEMES_TOPIC_ARN      = "${aws_sns_topic.fetch_themes.arn}"
    FETCH_THEMES_QUEUE_URL      = "${aws_sqs_queue.fetch_themes.id}"
    FETCH_THEMES_DEADLETTER_URL = "${aws_sqs_queue.fetch_themes_deadletter.id}"
  }
}
