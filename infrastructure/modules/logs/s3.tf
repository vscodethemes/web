resource "aws_s3_bucket" "logs" {
  bucket = "${var.bucket}"
  acl    = "private"

  tags {
    Environment = "${var.environment}"
  }
}
