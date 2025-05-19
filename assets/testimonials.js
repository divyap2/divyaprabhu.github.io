
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      text: "Divya is a knowledgeable, methodological, and efficient scientist and I have learned a great deal from her expertise and skills. Thus, I highly recommend her as a professional.",
      author: "~ Dr. Nantia Lakovidou (Senior Researcher at Khalifa University)"
    },
    {
      text: "I had the privilege of working with Divya when implementing the Bio repository system for the International Livestock Research Institute under the BUILD project. I must admit she was knowledgeable about her work and provided the best customer service and response time. I would without any reservations recommend her for any future opportunities that provide the chance to grow in career and skill.",
      author: "~ Innocent Obilil (Data Systems Information Specialist at ILRI)"
    },
    {
      text: "During the intensive period of implementing the new OpenSpecimen Workflow plug-in, Divya provided us with product support in a professional manner. Always fast, solution-oriented and based on our wishes. Thanks Divya!",
      author: "~ Jaap van Minnen (Project Manager at UMC Utrecht)"
    },
    {
      text: "Divya is delightful to work with - she gets the pulse of the customer very quickly, understands the capabilities of the product and what can and cannot be done and advises the customer about the best way of doing things. Divya designed and built the workflows functionality for the Fred Hutch Cancer Center and I worked closely with her providing requirements. She was savvy, smart, prompt and open to exploring alternate solutions. I wish Divya all the best and would jump at the opportunity to work with her again.",
      author: "~ Sunil Ayalasomayajula (Senior Consultant at Coppei)"
    },
    {
      text: "Divya is a very diligent, sincere, hard working and focused on the projects in hand. She is an excellent team member and highly dependable to get the task completed as per timelines. Pro-active attitude to learn, very good communicator & interpersonal skills.",
      author: "~ Amit Das (Co-Founder & Director at Med-Cubator Innovations Pvt. Ltd)"
    },
    {
      text: "I taught Divya Applied Mathematics, Biostatistics and Operations Research. Divya is very diligent, sincere and hard working. Apart from her skills, her ability to remain focused and her pro-active attitude to learn will be a great asset to her and any organization she works for.",
      author: "~ Dr. Poonam Soni (Associate Professor & HoD Mathematics at Thadomal Shahani Engineering College)"
    },
    {
      text: "I know Divya as a sincere, attentive and honest student with a focused mindset to achieve her goals. She was a bright student who always stood ahead of her peers in studies. Divya radiates positivity and energy through her pleasing persona. She believed in hard work and persistence. She was involved in social outreach through NSS and NGOs. I am confident about her sincerity and talent. I offer her best wishes and am proud of her as my student.",
      author: "~ Sachit Nalaskar (Associate Professor; Advisor, NSS; & Nodal Officer, UBA at TSEC)"
    }
  ];

  let index = 0;
  const textEl = document.getElementById("testimonial-text");
  const authorEl = document.getElementById("testimonial-author");
  const container = document.getElementById("testimonial-container");

  function showTestimonial(i) {
    container.style.opacity = 0;
    setTimeout(() => {
      textEl.textContent = testimonials[i].text;
      authorEl.textContent = testimonials[i].author;
      container.style.opacity = 1;
    }, 300);
  }

  setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }, 3000);

  showTestimonial(index);
});
