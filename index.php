
<?php
    $queries = array();
    parse_str($_SERVER['QUERY_STRING'], $queries);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <iframe src="http://localhost:3000/d-solo/cdo661vhvkyrkb/dashboard-lambda-metrics?orgId=1&var-cronjob=<?php echo $queries["cronjob"] ? $queries["cronjob"] : "cronjob2" ?>&panelId=1" width="450" height="200" frameborder="0"></iframe>
    <iframe src="http://localhost:3000/d-solo/cdo661vhvkyrkb/dashboard-lambda-metrics?orgId=1&var-cronjob=<?php echo $queries["cronjob"] ? $queries["cronjob"] : "cronjob2" ?>&theme=dark&panelId=2" width="450" height="200" frameborder="0"></iframe>
    <iframe src="http://localhost:3000/d-solo/cdo661vhvkyrkb/dashboard-lambda-metrics?orgId=1&var-cronjob=<?php echo $queries["cronjob"] ? $queries["cronjob"] : "cronjob2" ?>&theme=dark&panelId=3" width="450" height="200" frameborder="0"></iframe>
</body>
</html>