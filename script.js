document.addEventListener('DOMContentLoaded', () => {
  // Initial student data structure with multiple subjects
  let students = [
    { id: 1, name: "ARSHAD RA", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 2, name: "ASWIN S N", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 3, name: "JAIKRISHNA R", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 4, name: "JAYISNU J", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 5, name: "KAMALESH S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 6, name: "MADHUKAR S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 7, name: "NEELAKANDAN M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 8, name: "NIRANJAN S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 9, name: "PANDI M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 10, name: "RITHISH K", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 11, name: "SARJUN SHERIF A", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 12, name: "VINU PRASAD R P", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 13, name: "YESHWANTH P", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 14, name: "KAVIYA A", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 15, name: "LATHIKA SREE S", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 16, name: "OORVASHI M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 17, name: "SIVA SANKARI J", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 18, name: "SHIVA SREE RP (F)", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 19, name: "THILAKSHIYA U", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 20, name: "ABDULKARIM M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 21, name: "AKASHJITH G (F)", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 22, name: "GURUMYLESH M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 23, name: "SHANUF B", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 24, name: "SURYA P K", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 25, name: "VINOTH SL", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 26, name: "ATCHAYA M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 27, name: "PALL THANGAM V", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 28, name: "SAHANA M", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 },
    { id: 29, name: "SHIRLEYR", marks: { language: 0, english: 0, economics: 0, commerce: 0, accountancy: 0, caAud: 0 }, grandTotal: 0, percentage: 0, rank: null, attendance: 0 }
  ];

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
    // First, sort students by grand total to calculate ranks
    const sortedStudents = [...students].sort((a, b) => b.grandTotal - a.grandTotal);
    // Assign rank, handling ties
    let rank = 1;
    for (let i = 0; i < sortedStudents.length; i++) {
      if (i > 0 && sortedStudents[i].grandTotal < sortedStudents[i-1].grandTotal) {
        rank = i + 1;
      }
      sortedStudents[i].rank = rank;
    }
  tableBody.innerHTML = ''; 
    printTableBody.innerHTML = '';
    students.forEach((student, index) => {
      // Main table row (desktop)
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="text-center">
          <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
        </td>
        <th scope="row" class="text-center">${student.id}</th>
        <td>${student.name}</td>
        <td class="text-center">${student.marks.language}</td>
        <td class="text-center">${student.marks.english}</td>
        <td class="text-center">${student.marks.economics}</td>
        <td class="text-center">${student.marks.commerce}</td>
        <td class="text-center">${student.marks.accountancy}</td>
        <td class="text-center">${student.marks.caAud}</td>
        <td class="text-center">${student.grandTotal}</td>
        <td class="text-center">${student.percentage.toFixed(2)}%</td>
        <td class="text-center">${student.rank !== null ? student.rank : 'N/A'}</td>
        <td class="text-center">${student.attendance}</td>
      `;
      tableBody.appendChild(row);
      // Print table row
      const printRow = document.createElement('tr');
      printRow.innerHTML = `
        <td>${student.id}</td>
        <td class="text-start">${student.name}</td>
        <td>${student.marks.language}</td>
        <td>${student.marks.english}</td>
        <td>${student.marks.economics}</td>
        <td>${student.marks.commerce}</td>
        <td>${student.marks.accountancy}</td>
        <td>${student.marks.caAud}</td>
        <td>${student.grandTotal}</td>
        <td>${student.percentage.toFixed(2)}%</td>
        <td>${student.rank !== null ? student.rank : 'N/A'}</td>
        <td>${student.attendance}</td>
      `;
      printTableBody.appendChild(printRow);
    });
    renderStudentCards();
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
            <span class="badge bg-danger ms-2" title="Rank">${student.rank !== null ? student.rank : 'N/A'}</span>
            <span class="badge bg-primary ms-1" title="Attendance">${student.attendance}</span>
          </div>
          <button class="student-card-edit-btn mt-1" data-index="${index}" aria-label="Edit marks for ${student.name}"><i class="bi bi-pencil-square"></i></button>
        </div>
        <div class="student-card-marks-row row g-1 mt-2">
          <div class="col-4"><span><b>${abbr.language}:</b> ${student.marks.language}</span></div>
          <div class="col-4"><span><b>${abbr.english}:</b> ${student.marks.english}</span></div>
          <div class="col-4"><span><b>${abbr.economics}:</b> ${student.marks.economics}</span></div>
          <div class="col-4"><span><b>${abbr.commerce}:</b> ${student.marks.commerce}</span></div>
          <div class="col-4"><span><b>${abbr.accountancy}:</b> ${student.marks.accountancy}</span></div>
          <div class="col-4"><span><b>${abbr.caAud}:</b> ${student.marks.caAud}</span></div>
        </div>
        <div class="student-card-marks mt-2">
          <span><b>Total:</b> ${student.grandTotal}</span>
          <span><b>%:</b> ${student.percentage.toFixed(2)}%</span>
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

    // Validate and update marks for each subject
    for (const subject in studentMarkInputs) {
      const inputElement = studentMarkInputs[subject];
      if (inputElement.id !== 'attendance-input') {
        const mark = parseInt(inputElement.value);
        if (isNaN(mark) || mark < 0 || mark > 100) {
          validMarks = false;
          console.error(`Invalid mark for ${subject}`);
          break;
        }
        student.marks[subject] = mark;
        totalMarks += mark;
      }
    }
    
    // Update attendance
    const attendance = parseInt(studentMarkInputs.attendance.value);
    if (!isNaN(attendance) && attendance >= 0 && attendance <= 42) {
      student.attendance = attendance;
    } else {
      student.attendance = 0; // Default to 0 if invalid
      console.error('Invalid attendance value');
    }

    if (validMarks) {
      // Calculate and update grand total and percentage
      student.grandTotal = totalMarks;
      student.percentage = (totalMarks / 600) * 100;
      renderTable();
      updateSidebar(student);
    }
    
    markEntryModal.hide();
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
    
    editHeaderModal.hide();
  });
  
  // Event listener for the "Print" button
  printBtn.addEventListener('click', () => {
    window.print();
  });


  // Initial render of the table and mobile cards
  renderTable();
});
