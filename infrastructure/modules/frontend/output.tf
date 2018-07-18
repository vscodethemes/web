output "domain" {
  value = "${aws_cloudfront_distribution.app.domain_name}"
}
