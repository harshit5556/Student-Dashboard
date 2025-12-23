import Student from '../models/student.js';
import User from '../models/user.js';

export const getMyProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id;
    
    let student = await Student.findOne({ email: userEmail });
    
    if (!student) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      student = await Student.create({
        name: user.name,
        email: user.email,
        subjects: []
      });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const userEmail = req.user.email;
    const userId = req.user.id;
    
    const { name, email, course, subjects } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase().trim();
    if (course !== undefined && course.trim() !== '') {
      updateData.course = course.trim();
    }
    if (subjects !== undefined && subjects !== null) {
      let subjectsArray = [];
      if (Array.isArray(subjects)) {
        subjectsArray = subjects;
      } else if (subjects) {
        subjectsArray = [subjects];
      }
      
      const cleanedSubjects = subjectsArray
        .map(s => String(s))
        .filter(s => s && s.trim() && s.trim() !== 'Not Set' && s.trim() !== 'undefined' && s.trim() !== 'null')
        .map(s => s.trim());
      
      updateData.subjects = cleanedSubjects;
    }
    
    if (email && email.toLowerCase().trim() !== userEmail) {
      const existingStudent = await Student.findOne({ email: email.toLowerCase().trim() });
      if (existingStudent) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }
    
    let student = await Student.findOne({ email: userEmail });
    
    if (!student) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const subjectsArray = subjects !== undefined 
        ? (Array.isArray(subjects) ? subjects : [subjects]).filter(s => s && s.trim()).map(s => s.trim())
        : [];
      student = await Student.create({
        name: name || user.name,
        email: email ? email.toLowerCase().trim() : user.email,
        subjects: subjectsArray.length > 0 ? subjectsArray : []
      });
    } else {
      const updateQuery = { $set: updateData };
      
      student = await Student.findOneAndUpdate(
        { email: userEmail },
        updateQuery,
        { new: true, runValidators: true }
      );
      
      if (!student) {
        return res.status(404).json({ message: 'Student profile not found' });
      }
      
      const verifyStudent = await Student.findOne({ email: userEmail });
      if (verifyStudent) {
        student = verifyStudent;
      }
    }
    
    if (email && email.toLowerCase().trim() !== userEmail) {
      await User.findByIdAndUpdate(
        userId,
        { email: email.toLowerCase().trim() }
      );
    }
    
    if (name) {
      await User.findByIdAndUpdate(
        userId,
        { name: name }
      );
    }
    
    const responseStudent = student.toObject ? student.toObject() : student;
    if (!Array.isArray(responseStudent.subjects)) {
      if (responseStudent.subjects) {
        responseStudent.subjects = [responseStudent.subjects];
      } else {
        responseStudent.subjects = [];
      }
    }
    responseStudent.subjects = responseStudent.subjects.filter(s => s && String(s).trim() && String(s).trim() !== 'Not Set');
    
    res.json(responseStudent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update profile', error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    const studentsWithSubjects = students.map(student => {
      const studentObj = student.toObject ? student.toObject() : student;
      let subjectsArray = [];
      if (Array.isArray(studentObj.subjects)) {
        subjectsArray = studentObj.subjects.filter(s => s && String(s).trim() && String(s).trim() !== 'Not Set');
      } else if (studentObj.subjects && String(studentObj.subjects).trim() !== 'Not Set') {
        subjectsArray = [String(studentObj.subjects)].filter(s => s && s.trim() && s !== 'Not Set');
      }
      return {
        ...studentObj,
        subjects: subjectsArray
      };
    });
    res.json(studentsWithSubjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create student', error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    if (req.params.id === 'me') {
      return res.status(403).json({ message: 'Use /me endpoint for your own profile' });
    }
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update student', error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};
