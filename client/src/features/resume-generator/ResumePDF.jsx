import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    // backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

// Create Document Component
const Resume = () => {
  const name = 'John Doe';
  const email = 'johndoe@example.com';
  const phone = '123-456-7890';
  const experiences = [
    {
      employerName: 'Google',
      roleName: 'Software Engineer',
      description: 'Developed a web application using React and Node.js. Worked on frontend and backend.',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
    {
      employerName: 'Microsoft',
      roleName: 'Software Engineer',
      description: 'Developed a mobile application using React Native.',
      startDate: '2021-01-01',
      endDate: '2021-12-31',
    },
    {
      employerName: 'Apple',
      roleName: 'Software Engineer',
      description: 'Developed a mobile application using Swift and Objective-C.',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.fullName}>{name}</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Experiences</Text>
          {experiences.map((experience, index) => (
            <View key={index} style={styles.section}>
              <Text>{experience.employerName}</Text>
              <Text>{experience.roleName}</Text>
              <Text>{experience.description}</Text>
              <Text>{experience.startDate}</Text>
              <Text>{experience.endDate}</Text>
            </View>
          ))}
        </View>
        {/* TODO: we should store education info in the client */}
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          <Text>Section #1</Text>
        </View>
        
      </Page>
    </Document>
  )
};

export default Resume;