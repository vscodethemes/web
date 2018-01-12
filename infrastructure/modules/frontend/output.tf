output "s3_bucket" {
  value = "${aws_s3_bucket.bucket.id}"
}

output "cf_distribution_id" {
  value = "${aws_cloudfront_distribution.distribution.id}"
}

output "cf_domain_name" {
  value = "${aws_cloudfront_distribution.distribution.domain_name}"
}
