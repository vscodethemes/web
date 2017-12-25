output "fetch_themes_sns_topic_arn" {
  value = "${module.fetch_themes.sns_topic_arn}"
}

output "fetch_themes_sqs_queue_url" {
  value = "${module.fetch_themes.sqs_queue_url}"
}

output "fetch_themes_sqs_deadletter_queue_url" {
  value = "${module.fetch_themes.sqs_deadletter_queue_url}"
}
