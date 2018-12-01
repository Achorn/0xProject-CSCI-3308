<html>
  <head>
    <title> Information Gathered</title>
  </head>
  <body>
    <?php
    echo "<p>Data processed</>";
    $email = $_POST['email'];
    $pswd = $_POST['psw'];
    $pswdRep = $_POST['psw-repeat'];

    echo $email . "</br>";
    echo $pswd . "</br>";
    echo $pswdRep . "</br>";
    ?>
  </body>
</html>
