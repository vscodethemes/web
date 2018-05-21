######
# S3 #
######
data "aws_iam_policy_document" "storage_bucket" {
  # allows public reads from everyone to the s3 bucket
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.storage_bucket}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "storage" {
  bucket = "${var.storage_bucket}"
  acl    = "public-read"
  policy = "${data.aws_iam_policy_document.storage_bucket.json}"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
  }
}

##############
# CloudFront #
##############

resource "aws_cloudfront_distribution" "storage" {
  origin {
    domain_name = "${aws_s3_bucket.storage.bucket_domain_name}"
    origin_id   = "storageS3Origin"
  }

  # aliases = ["${var.domain}", "www.${var.domain}"]

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  # use PriceClass_200 for edge locations outside of US, Canada and Europe
  price_class = "PriceClass_100"
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "storageS3Origin"
    compress         = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = "true"
  }
}
