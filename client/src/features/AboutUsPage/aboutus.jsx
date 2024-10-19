import AppLayout from "../../components/AppLayout";

const AboutUsPage = () => {
  return (
    <AppLayout title="About Us">
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#495195]">
            Welcome to Rebirth Empowerment
          </h1>
          <p className="text-lg text-gray-600">
            At Rebirth Empowerment, we believe in second chances and the
            transformative power of employment. Our mission is to uplift
            individuals in low-income brackets by providing them with the tools,
            resources, and opportunities necessary to secure meaningful
            employment.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[#495195]">
            Our Vision
          </h2>
          <p className="text-gray-600 mb-4">
            We envision a world where every individual, regardless of their
            background, has access to employment opportunities that allow them
            to thrive. We strive to create a supportive environment where our
            clients can connect directly with employers who are committed to
            making a difference.
          </p>
        </section>

        {/* Unique Approach Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[#495195]">
            Our Unique Approach
          </h2>
          <p className="text-gray-600 mb-4">
            Rebirth Empowerment offers a closed job board system designed to
            connect clients one-on-one with employers, ensuring a transparent
            and effective job search experience. Our platform eliminates the
            frustration of ghost jobs, allowing clients to focus on what matters
            most—building their futures.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-[#495195]">
            Training and Certification
          </h3>
          <p className="text-gray-600 mb-4">
            To ensure our clients are job-ready, we require them to complete
            specialized training and obtain relevant certifications. This
            process not only equips them with essential skills but also unlocks
            access to exclusive job opportunities tailored to their
            qualifications.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-[#495195]">
            Daily Streaks for Progress
          </h3>
          <p className="text-gray-600">
            We recognize the importance of consistent effort and motivation. Our
            clients earn daily streaks for completing 30 minutes of training
            each day, fostering a habit of learning and growth. This system
            encourages accountability and helps clients stay engaged in their
            journey towards employment.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[#495195]">
            Join Us in Empowering Change
          </h2>
          <p className="text-gray-600 mb-8">
            At Rebirth Empowerment, we are more than just a job placement
            service—we are a community dedicated to fostering empowerment and
            growth. We invite you to join us in our mission to create
            sustainable employment opportunities for those who need it most.
            Together, we can help individuals rewrite their narratives and
            reclaim their futures.
          </p>
          <h3 className="text-2xl font-semibold mb-4 text-[#495195]">
            Connect with Us
          </h3>
          <p className="text-gray-600 mb-8">
            Whether you’re looking to partner with us as an employer, support
            our mission through donations, or seek assistance as a client, we
            welcome you to reach out. Let’s work together to create a brighter
            future for all.
          </p>
        </section>
      </div>
    </AppLayout>
  );
};

export default AboutUsPage;
