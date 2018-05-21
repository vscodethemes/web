output "storage_s3_bucket" {
  value = "${aws_s3_bucket.storage.id}"
}

output "storage_cf_domain_name" {
  value = "${aws_cloudfront_distribution.storage.domain_name}"
}

output "scrape_extensions_sns_topic_arn" {
  value = "${aws_sns_topic.scrape_extensions.arn}"
}

output "scrape_extensions_sqs_queue_url" {
  value = "${aws_sqs_queue.scrape_extensions.id}"
}

output "scrape_extensions_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.scrape_extensions_deadletter.id}"
}

output "extract_themes_sns_topic_arn" {
  value = "${aws_sns_topic.extract_themes.arn}"
}

output "extract_themes_sqs_queue_url" {
  value = "${aws_sqs_queue.extract_themes.id}"
}

output "extract_themes_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.extract_themes_deadletter.id}"
}

output "extract_colors_sns_topic_arn" {
  value = "${aws_sns_topic.extract_colors.arn}"
}

output "extract_colors_sqs_queue_url" {
  value = "${aws_sqs_queue.extract_colors.id}"
}

output "extract_colors_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.extract_colors_deadletter.id}"
}
