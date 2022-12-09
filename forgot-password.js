document.getElementById("submit").addEventListener("click", (e) => {
    // window.open('mailto:test@example.com');
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "username",
        Password : "password",
        To : 'rasikapunde@gmail.com',
        From : "http://127.0.0.1:8080/",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
  });