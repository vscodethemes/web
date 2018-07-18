output "bucket" {
  value = "${aws_s3_bucket.logs.id}"
}

output "bucket_domain" {
  value = "${aws_s3_bucket.logs.bucket_domain_name}"
}
