<?php
echo password_verify("123456", "$2y$10$jvIE.cfIRoCof7l1V1lR4O/Vubxf6bS3p3nmubsHuUoDb.8uZ5HTa") ? "OK" : "FAIL";
?>