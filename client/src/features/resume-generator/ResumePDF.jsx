import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    display: 'flex'
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
  spaced: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

// Create Document Component
const Resume = ({ name, email, phone, experiences, education }) => {
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
              <View style={styles.spaced}>  
                <Text style={{
                  fontWeight: 'bold',
                }}>{experience.roleName}</Text>
                <Text>{experience.startDate} - {experience.endDate}</Text>
              </View>
              <Text>{experience.employerName}</Text>
              <Text>{experience.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;