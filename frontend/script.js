// frontend/script.js

// Initialize Supabase
const supabaseUrl = 'https://mokqpjrqgjlekuhybclo.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1va3FwanJxZ2psZWt1aHliY2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMDYxOTAsImV4cCI6MjA0NTg4MjE5MH0.ziVCEj_ZxOLg49_srT-BWPlOhzm70ZMTZc64l-n5LSU'; // Replace with your Supabase Anon Key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

function toggleSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const parentName = document.getElementById('parentName').value;
    const academicInfo = document.getElementById('academicInfo').value;
    const healthInfo = document.getElementById('healthInfo').value;

    const { data, error } = await supabase
        .from('students')
        .insert([{ name, parent_name: parentName, academic_info: academicInfo, health_info: healthInfo }]);

    if (error) {
        alert('Error registering student: ' + error.message);
    } else {
        alert('Student registered successfully!');
        e.target.reset();
    }
});

document.getElementById('uploadMarksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const marks = document.getElementById('marks').value;

    const { data, error } = await supabase
        .from('students')
        .update({ marks })
        .eq('id', studentId);

    if (error) {
        alert('Error uploading marks: ' + error.message);
    } else {
        alert('Marks uploaded successfully!');
        e.target.reset();
    }
});

async function searchStudent() {
    const name = document.getElementById('searchInput').value;
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .ilike('name', `%${name}%`);

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (error) {
        alert('Error searching for student: ' + error.message);
        return;
    }

    data.forEach(student => {
        resultsDiv.innerHTML += `<div>${student.name}: ${student.marks} marks</div>`;
    });
}

async function generateReport() {
    const studentId = document.getElementById('reportStudentId').value;
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

    const reportResultDiv = document.getElementById('reportResult');
    reportResultDiv.innerHTML = '';

    if (error || !data) {
        reportResultDiv.innerHTML = 'Error generating report: ' + (error ? error.message : 'Student not found');
        return;
    }

    reportResultDiv.innerHTML = `
        <h3>Report for ${data.name}</h3>
        <p>Marks: ${data.marks}</p>
    `;
}
