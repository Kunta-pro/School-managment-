const apiUrl = "http://localhost:3000";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const response = await fetch(`${apiUrl}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role: "student" }),
  });
});

document.getElementById("marksForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const student_id = document.getElementById("student_id").value;
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  await fetch(`${apiUrl}/upload-marks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ student_id, subject, grade }),
  });
});
