document.addEventListener('DOMContentLoaded', () => {
  // Reusable rank calculation function
  function calculateRanks(studentList) {
    // Calculate grandTotal and percentage for each student
    studentList.forEach(student => {
      let totalMarks = 0;
      let validMarks = true;
      for (const subject of ['language','english','economics','commerce','accountancy','caAud']) {
        const val = student.marks[subject];
        if (val === 'AB' || val === '' || val === null) {
          validMarks = false;
        } else if (typeof val === 'number') {
          totalMarks += val;
        } else if (!isNaN(parseInt(val))) {
          totalMarks += parseInt(val);
        } else {
          validMarks = false;
        }
      }
      student.grandTotal = totalMarks;
      student.percentage = (totalMarks / 600) * 100;
    });
    // Sort by grandTotal descending
    const sorted = [...studentList].sort((a, b) => b.grandTotal - a.grandTotal);
    // Find eligible students (no AB or fail)
    const eligible = sorted.filter(student => {
      for (const subject of ['language','english','economics','commerce','accountancy','caAud']) {
        const val = student.marks[subject];
        if (val === 'AB' || (typeof val === 'number' && val < 40) || (!isNaN(parseInt(val)) && parseInt(val) < 40)) {
          return false;
        }
      }
      return true;
    });
    // Assign ranks
    let rank = 1;
    let prevTotal = null;
    let prevRank = null;
    for (let i = 0; i < eligible.length; i++) {
      const student = eligible[i];
      if (prevTotal !== null && student.grandTotal === prevTotal) {
        student.rank = prevRank;
      } else {
        student.rank = rank;
        prevRank = rank;
      }
      prevTotal = student.grandTotal;
      rank++;
    }
    // Assign null rank to ineligible students
    studentList.forEach(student => {
      if (!eligible.includes(student)) {
        student.rank = null;
      }
    });
  }
  // Import CSV button logic
  const importCsvBtn = document.getElementById('import-csv-btn');
  const importCsvInput = document.getElementById('import-csv-input');
  if (importCsvBtn && importCsvInput) {
    importCsvBtn.addEventListener('click', () => {
      importCsvInput.value = '';
      importCsvInput.click();
    });
    importCsvInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          importStudentsFromCSV(evt.target.result);
        };
        reader.readAsText(file);
      }
    });
  }

  function importStudentsFromCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const dataLines = lines.slice(1);
    const newStudents = [];
    dataLines.forEach((line, idx) => {
      // Support both quoted and unquoted CSV
      let cols;
      if (line.includes('"')) {
        cols = line.match(/("[^"]*"|[^,]+)/g).map(c => c.replace(/"/g, '').trim());
      } else {
        cols = line.split(',').map(c => c.trim());
      }
      if (cols.length < 13) return;
      newStudents.push({
        exNo: cols[0],
        id: parseInt(cols[1]),
        name: cols[2],
        marks: {
          language: isNaN(parseInt(cols[3])) ? cols[3] : parseInt(cols[3]),
          english: isNaN(parseInt(cols[4])) ? cols[4] : parseInt(cols[4]),
          economics: isNaN(parseInt(cols[5])) ? cols[5] : parseInt(cols[5]),
          commerce: isNaN(parseInt(cols[6])) ? cols[6] : parseInt(cols[6]),
          accountancy: isNaN(parseInt(cols[7])) ? cols[7] : parseInt(cols[7]),
          caAud: isNaN(parseInt(cols[8])) ? cols[8] : parseInt(cols[8])
        },
        grandTotal: 0, // will be recalculated
        percentage: 0, // will be recalculated
        rank: null, // will be recalculated
        attendance: parseFloat(cols[12])
      });
    });
  students = newStudents;
  calculateRanks(students);
  saveStudentsToLocalStorage();
  renderTable();
  }
  // Export CSV button logic
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      exportStudentsToCSV();
    });
  }

  function exportStudentsToCSV() {
    // CSV header
    const header = [
      'EX.NO', 'S.NO', 'NAME', 'LANGUAGE', 'ENGLISH', 'ECONOMICS', 'COMMERCE', 'ACCOUNTANCY', 'CA AUD', 'GRAND TOTAL', 'PERCENTAGE', 'RANK', 'ATTENDANCE'
    ];
    // Build rows
    const rows = students.map(student => [
      student.exNo,
      student.id,
      student.name,
      student.marks.language,
      student.marks.english,
      student.marks.economics,
      student.marks.commerce,
      student.marks.accountancy,
      student.marks.caAud,
      student.grandTotal,
      Math.round(student.percentage * 100) / 100,
      student.rank !== null ? student.rank : '',
      student.attendance
    ]);
    // Combine header and rows
    const csvContent = [header, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_marklist.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  // Reset button logic
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all data? This will erase all marks and report details.')) {
        localStorage.removeItem('students');
        localStorage.removeItem('reportDetails');
        location.reload();
      }
    });
  }
  // Step 6: Save/load report details (exam name, class, year)
  function saveReportDetailsToLocalStorage() {
    const reportDetails = {
      examName: examTitle.textContent,
      className: classInfo.textContent.split(' | ')[0].replace('Class: ', ''),
      year: classInfo.textContent.split(' | ')[1].replace('Year: ', '')
    };
    localStorage.setItem('reportDetails', JSON.stringify(reportDetails));
  }

  function loadReportDetailsFromLocalStorage() {
    const data = localStorage.getItem('reportDetails');
    if (data) {
      const details = JSON.parse(data);
      if (details.examName) examTitle.textContent = details.examName;
      if (details.className && details.year) classInfo.textContent = `Class: ${details.className} | Year: ${details.year}`;
      if (details.examName) printExamName.textContent = `${details.examName} CONSOLIDATED MARK LIST`;
      if (details.className && details.year) printClassInfo.textContent = `${details.className} ${details.year}`;
    }
  }
  // Step 1: Local storage save/load functions
  function saveStudentsToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
  }

  function loadStudentsFromLocalStorage() {
    const data = localStorage.getItem('students');
    if (data) {
      students = JSON.parse(data);
    }
  }
  // Declare students globally
  let students;
  // Initial student data structure with multiple subjects
  const initialStudents = [
    { exNo: "11CA29", id: 1, name: "ARSHAD RA", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA30", id: 2, name: "ASWIN S N", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA31", id: 3, name: "JAIKRISHNA R", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA32", id: 4, name: "JAYISNU J", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA33", id: 5, name: "KAMALESH S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA34", id: 6, name: "MADHUKAR S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA35", id: 7, name: "NEELAKANDAN M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA36", id: 8, name: "NIRANJAN S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA37", id: 9, name: "PANDI M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA38", id: 10, name: "RITHISH K", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA39", id: 11, name: "SARJUN SHERIF A", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA40", id: 12, name: "VINU PRASAD R P", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA41", id: 13, name: "YESHWANTH P", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA42", id: 14, name: "KAVIYA A", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA43", id: 15, name: "LATHIKA SREE S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA44", id: 16, name: "OORVASHI M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA45", id: 17, name: "SIVA SANKARI J", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA46", id: 18, name: "SHIVA SREE R P", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11CA47", id: 19, name: "THILAKSHIYA U", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG48", id: 20, name: "ABDULKARIM M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG49", id: 21, name: "AKASHJITH G", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG50", id: 22, name: "GURUMYLESH M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG51", id: 23, name: "SHANUF B", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG52", id: 24, name: "SURYA P K", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG53", id: 25, name: "VINOTH SL", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG54", id: 26, name: "ATCHAYA M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG55", id: 27, name: "PALL THANGAM V", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG56", id: 28, name: "SAHANA M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { exNo: "11VG57", id: 29, name: "SHIRLEYR", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 }
  ];

  // Load students and report details from localStorage or use initial data
  loadStudentsFromLocalStorage();
  loadReportDetailsFromLocalStorage();
  if (!students || students.length === 0) {
    students = initialStudents;
    saveStudentsToLocalStorage();
  }

  // DOM elements
  const tableBody = document.getElementById('student-table-body');
  const printTableBody = document.getElementById('print-table-body');
  const markEntryModal = new bootstrap.Modal(document.getElementById('mark-entry-modal'));
  const studentNameInModal = document.getElementById('student-name-in-modal');
  const studentMarkInputs = {
    language: document.getElementById('language-mark'),
    english: document.getElementById('english-mark'),
    economics: document.getElementById('economics-mark'),
    commerce: document.getElementById('commerce-mark'),
    accountancy: document.getElementById('accountancy-mark'),
    caAud: document.getElementById('ca-aud-mark'),
    attendance: document.getElementById('attendance-input')
  };
  const saveMarkBtn = document.getElementById('save-mark-btn');
  const prevStudentBtn = document.getElementById('prev-student-btn');
  const nextStudentBtn = document.getElementById('next-student-btn');
  const sidebarStudentName = document.getElementById('sidebar-student-name');
  const sidebarGrandTotal = document.getElementById('sidebar-grand-total');
  const sidebarPercentage = document.getElementById('sidebar-percentage');
  const sidebarRank = document.getElementById('sidebar-rank');
  const sidebarAttendance = document.getElementById('sidebar-attendance');
  const sidebarSubjectList = document.getElementById('sidebar-subject-list');
  
  // Header elements
  const examTitle = document.getElementById('exam-title');
  const classInfo = document.getElementById('class-info');
  const editHeaderBtn = document.getElementById('edit-header-btn');
  const printBtn = document.getElementById('print-btn');
  const editHeaderModal = new bootstrap.Modal(document.getElementById('edit-header-modal'));
  const examNameInput = document.getElementById('exam-name-input');
  const classNameInput = document.getElementById('class-name-input');
  const yearInput = document.getElementById('year-input');
  const saveHeaderBtn = document.getElementById('save-header-btn');
  
  // Print-specific elements
  const printSchoolName = document.getElementById('print-school-name');
  const printExamName = document.getElementById('print-exam-name');
  const printClassInfo = document.getElementById('print-class-info');

  let currentStudentIndex = 0;

  // Function to render the student table (desktop) and mobile card view
  function renderTable() {
    // First, sort students by grand total
    const sortedStudents = [...students].sort((a, b) => b.grandTotal - a.grandTotal);

    // Identify eligible students (not absent/fail)
    const eligible = sortedStudents.filter(student => {
      const marks = student.marks;
      for (const subject in marks) {
        if (subject === 'attendance') continue;
        if (marks[subject] === 'AB' || (typeof marks[subject] === 'number' && marks[subject] < 40)) {
          return false;
        }
      }
      return true;
    });

    // Assign ranks in a separate loop
    let rank = 1;
    let prevTotal = null;
    let prevRank = null;
    for (let i = 0; i < eligible.length; i++) {
      const student = eligible[i];
      if (prevTotal !== null && student.grandTotal === prevTotal) {
        student.rank = prevRank;
      } else {
        student.rank = rank;
        prevRank = rank;
      }
      prevTotal = student.grandTotal;
      rank++;
    }

    // Assign null rank to ineligible students
    sortedStudents.forEach(student => {
      if (!eligible.includes(student)) {
        student.rank = null;
      }
    });

    // Update the original students array with the new ranks
    sortedStudents.forEach(sortedStudent => {
      const original = students.find(s => s.id === sortedStudent.id);
      if (original) {
        original.rank = sortedStudent.rank;
      }
    });
  tableBody.innerHTML = ''; 
    printTableBody.innerHTML = '';
    students.forEach((student, index) => {
      // Insert group code header rows in print table body only
      if (index === 0) {
        const groupRow = document.createElement('tr');
        groupRow.innerHTML = `<td colspan="14" style="font-weight:bold;text-align:center;background:#bcbcbc;">GROUP CODE - 2702</td>`;
        printTableBody.appendChild(groupRow);
      }
      if (index === 19) {
        // Insert group code row for 2982 with page break style
        const groupRow = document.createElement('tr');
        groupRow.innerHTML = `<td colspan="14" style="font-weight:bold;text-align:center;background:#bcbcbc;page-break-before:always;">GROUP CODE - 2982</td>`;
        printTableBody.appendChild(groupRow);
      }
      // ...existing code for table and print rows...
      const row = document.createElement('tr');
      const rankDisplay = student.rank !== null ? student.rank : '-';
      row.innerHTML = `
        <td class="text-center">${student.exNo}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
        </td>
        <th scope="row" class="text-center">${student.id}</th>
        <td>${student.name}</td>
        <td class="text-center">${markCell(student.marks.language)}</td>
        <td class="text-center">${markCell(student.marks.english)}</td>
        <td class="text-center">${markCell(student.marks.economics)}</td>
        <td class="text-center">${markCell(student.marks.commerce)}</td>
        <td class="text-center">${markCell(student.marks.accountancy)}</td>
        <td class="text-center">${markCell(student.marks.caAud)}</td>
        <td class="text-center">${student.grandTotal}</td>
  <td class="text-center">${Math.round(student.percentage)}%</td>
        <td class="text-center">${rankDisplay}</td>
        <td class="text-center">${student.attendance}</td>
      `;
      tableBody.appendChild(row);
      // Print table row
      const printRow = document.createElement('tr');
      printRow.innerHTML = `
        <td>${student.exNo}</td>
        <td>${student.id}</td>
        <td class="text-start">${student.name}</td>
        <td>${markCell(student.marks.language)}</td>
        <td>${markCell(student.marks.english)}</td>
        <td>${markCell(student.marks.economics)}</td>
        <td>${markCell(student.marks.commerce)}</td>
        <td>${markCell(student.marks.accountancy)}</td>
        <td>${markCell(student.marks.caAud)}</td>
        <td>${student.grandTotal}</td>
  <td>${Math.round(student.percentage)}%</td>
        <td>${rankDisplay}</td>
        <td>${student.attendance}</td>
      `;
      printTableBody.appendChild(printRow);
    });
    renderStudentCards();
  }

  function markCell(val) {
  if (val === 'AB') return '<b style="color:#dc3545;">AB</b>';
  if (typeof val === 'number' && val < 40) return `<b style="text-decoration:underline;">${val}</b>`;
  return `${val}`;
  }

  // Function to render student cards for mobile view
  function renderStudentCards() {
    const cardList = document.getElementById('student-card-list');
    if (!cardList) return;
    cardList.innerHTML = '';
    // Subject abbreviations
    const abbr = {
      language: 'LAN',
      english: 'ENG',
      economics: 'ECO',
      commerce: 'COM',
      accountancy: 'ACC',
      caAud: 'CA/AUD'
    };
  students.forEach((student, index) => { 
      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <div class="student-card-header d-flex justify-content-between align-items-start">
          <div>
            <span>${student.name}</span>
            <span class="badge bg-danger ms-2" title="Rank">${student.rank !== null ? student.rank : '-'}</span>
            <span class="badge bg-primary ms-1" title="Attendance">${student.attendance}</span>
          </div>
          <button class="student-card-edit-btn mt-1" data-index="${index}" aria-label="Edit marks for ${student.name}"><i class="bi bi-pencil-square"></i></button>
        </div>
        <div class="student-card-marks-row row g-1 mt-2">
          <div class="col-4"><b>${abbr.language}:</b> ${markCell(student.marks.language)}</div>
          <div class="col-4"><b>${abbr.english}:</b> ${markCell(student.marks.english)}</div>
          <div class="col-4"><b>${abbr.economics}:</b> ${markCell(student.marks.economics)}</div>
          <div class="col-4"><b>${abbr.commerce}:</b> ${markCell(student.marks.commerce)}</div>
          <div class="col-4"><b>${abbr.accountancy}:</b> ${markCell(student.marks.accountancy)}</div>
          <div class="col-4"><b>${abbr.caAud}:</b> ${markCell(student.marks.caAud)}</div>
        </div>
        <div class="student-card-marks mt-2">
          <span><b>Total:</b> ${student.grandTotal}</span>
          <span><b>%:</b> ${Math.round(student.percentage)}%</span>
        </div>
      `;
      cardList.appendChild(card);
    });
  }
  // Event listener for the mobile card view's edit buttons
  const studentCardList = document.getElementById('student-card-list');
  if (studentCardList) {
    studentCardList.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.student-card-edit-btn');
      if (editBtn) {
        const index = parseInt(editBtn.dataset.index);
        updateModal(index);
        updateSidebar(students[index]);
      }
    });
        // Double-click on card to open edit modal
        studentCardList.addEventListener('dblclick', (e) => {
          const card = e.target.closest('.student-card');
          if (card) {
            // Find the edit button inside the card and get its data-index
            const editBtn = card.querySelector('.student-card-edit-btn');
            if (editBtn) {
              const index = parseInt(editBtn.dataset.index);
              updateModal(index);
              updateSidebar(students[index]);
            }
          }
        });
  }

  // Function to update the modal with the current student's data
  function updateModal(index) {
    if (index >= 0 && index < students.length) {
      currentStudentIndex = index;
      const student = students[currentStudentIndex];
      studentNameInModal.textContent = student.name;
      
      // Populate subject marks
      studentMarkInputs.language.value = student.marks.language;
      studentMarkInputs.english.value = student.marks.english;
      studentMarkInputs.economics.value = student.marks.economics;
      studentMarkInputs.commerce.value = student.marks.commerce;
      studentMarkInputs.accountancy.value = student.marks.accountancy;
      studentMarkInputs.caAud.value = student.marks.caAud;
      studentMarkInputs.attendance.value = student.attendance;

      // Enable/disable navigation buttons
      prevStudentBtn.disabled = currentStudentIndex === 0;
      nextStudentBtn.disabled = currentStudentIndex === students.length - 1;
      
      // Show the modal
      markEntryModal.show();
    }
  }

  // Function to update the sidebar with the currently selected student's details
  function updateSidebar(student) {
    if (student) {
      sidebarStudentName.textContent = student.name;
      sidebarGrandTotal.textContent = student.grandTotal;
      sidebarPercentage.textContent = `${student.percentage.toFixed(2)}%`;
      sidebarRank.textContent = student.rank !== null ? student.rank : 'N/A';
      sidebarAttendance.textContent = student.attendance;

      // Update subject marks in sidebar
      sidebarSubjectList.innerHTML = '';
      const subjects = Object.keys(student.marks);
      const subjectNames = {
          language: "LANGUAGE",
          english: "ENGLISH",
          economics: "ECONOMICS & EMPOLYABILITY SKILLS",
          commerce: "COMMERCE",
          accountancy: "ACCOUNTANCY",
          caAud: "CA & AUD"
      };
      
      subjects.forEach(subjectKey => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
          <span>${subjectNames[subjectKey]}</span>
          <span class="badge bg-primary rounded-pill">${student.marks[subjectKey]}</span>
        `;
        sidebarSubjectList.appendChild(li);
      });
    } else {
      sidebarStudentName.textContent = 'No student selected';
      sidebarGrandTotal.textContent = '--';
      sidebarPercentage.textContent = '--';
      sidebarRank.textContent = '--';
      sidebarAttendance.textContent = '--';
      sidebarSubjectList.innerHTML = '';
    }
  }

  // Event listener for the table's "Edit" buttons
  tableBody.addEventListener('click', (e) => {
    // Check if the clicked element is the button or an element inside it
    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      const index = parseInt(editBtn.dataset.index);
      updateModal(index);
      updateSidebar(students[index]);
    }
      });
      // Double-click on table row to open edit modal
      tableBody.addEventListener('dblclick', (e) => {
        const row = e.target.closest('tr');
        if (row) {
          // Find the edit button inside the row and get its data-index
          const editBtn = row.querySelector('.edit-btn');
          if (editBtn) {
            const index = parseInt(editBtn.dataset.index);
            updateModal(index);
            updateSidebar(students[index]);
          }
        }
  });

  // Event listener for the modal's "Save" button
  saveMarkBtn.addEventListener('click', () => {
    let student = students[currentStudentIndex];
    let totalMarks = 0;
    let validMarks = true;

    // Validate and update marks for each subject, allow 'AB' for absent
    for (const subject in studentMarkInputs) {
      const inputElement = studentMarkInputs[subject];
      if (inputElement.id !== 'attendance-input') {
        const value = inputElement.value.trim().toUpperCase();
        if (value === 'AB') {
          student.marks[subject] = 'AB';
          // Do not add to totalMarks
        } else {
          const mark = parseInt(value);
          if (isNaN(mark) || mark < 0 || mark > 100) {
            validMarks = false;
            console.error(`Invalid mark for ${subject}`);
            break;
          }
          student.marks[subject] = mark;
          totalMarks += mark;
        }
      }
    }
    
    // Update attendance
    const attendance = parseFloat(studentMarkInputs.attendance.value);
    if (!isNaN(attendance) && attendance >= 0 && attendance <= 100) {
      student.attendance = Math.round(attendance * 10) / 10;
    } else {
      student.attendance = 0; // Default to 0 if invalid
      console.error('Invalid attendance value');
    }

    if (validMarks) {
      // Calculate and update grand total and percentage
      student.grandTotal = totalMarks;
      student.percentage = (totalMarks / 600) * 100;
      calculateRanks(students);
      saveStudentsToLocalStorage();
      renderTable();
      updateSidebar(student);
    }
    
    markEntryModal.hide();
  });

  // Step 4: Save to localStorage when attendance is updated directly
  studentMarkInputs.attendance.addEventListener('change', function() {
    if (currentStudentIndex >= 0 && currentStudentIndex < students.length) {
      const val = parseFloat(this.value);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        students[currentStudentIndex].attendance = Math.round(val * 10) / 10;
        saveStudentsToLocalStorage();
      }
    }
  });

  // Event listener for the modal's "Previous" button
  prevStudentBtn.addEventListener('click', () => {
    if (currentStudentIndex > 0) {
      currentStudentIndex--;
      updateModal(currentStudentIndex);
      updateSidebar(students[currentStudentIndex]);
    }
  });

  // Event listener for the modal's "Next" button
  nextStudentBtn.addEventListener('click', () => {
    if (currentStudentIndex < students.length - 1) {
      currentStudentIndex++;
      updateModal(currentStudentIndex);
      updateSidebar(students[currentStudentIndex]);
    }
  });

  // Event listener for the "Edit Header" button
  editHeaderBtn.addEventListener('click', () => {
    examNameInput.value = examTitle.textContent;
    classNameInput.value = classInfo.textContent.split(' | ')[0].replace('Class: ', '');
    yearInput.value = classInfo.textContent.split(' | ')[1].replace('Year: ', '');
    editHeaderModal.show();
  });
  
  // Event listener for saving the header details
  saveHeaderBtn.addEventListener('click', () => {
    const className = classNameInput.value;
    const year = yearInput.value;
    const examName = examNameInput.value;

    examTitle.textContent = examName;
    classInfo.textContent = `Class: ${className} | Year: ${year}`;
    
    // Update print-only elements
    printExamName.textContent = `${examName} CONSOLIDATED MARK LIST`;
    printClassInfo.textContent = `${className} ${year}`;
  saveStudentsToLocalStorage();
  saveReportDetailsToLocalStorage();
    editHeaderModal.hide();
  });
  
  // Event listener for the "Print" button
  printBtn.addEventListener('click', () => {
    window.print();
  });


  // Initial render of the table and mobile cards
  renderTable();
});
