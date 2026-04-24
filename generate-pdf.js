const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('itchamps_insights.pdf'));

doc.fontSize(24).fillColor('#008fd3').text('ITChamps: Company Insights & Analysis', { align: 'center' });
doc.moveDown(1.5);

doc.fontSize(16).fillColor('#0a1931').text('Core Expertise');
doc.fontSize(12).fillColor('#333333').text('- SAP Consulting and Implementation');
doc.text('- Technical Training & Enablement');
doc.text('- Cloud Transformation');
doc.text('- Automation Solutions');
doc.text('- International Payroll Processing');
doc.moveDown();

doc.fontSize(16).fillColor('#0a1931').text('Customer-Centric Approach');
doc.fontSize(12).fillColor('#333333').text('The company emphasizes delivering simplified, highly effective solutions tailored to complex customer requirements. A key differentiator is their focus on helping clients extract the maximum value from existing IT investments, not just adopting new technologies for the sake of it. The strongest testament to their operational excellence is their high rate of repeat business and direct customer referrals.', { align: 'justify' });
doc.moveDown();

doc.fontSize(16).fillColor('#0a1931').text('Industry Focus');
doc.fontSize(12).fillColor('#333333').text('ITChamps leverages deep, cross-industry knowledge to address specialized challenges across diverse sectors, including:');
doc.text('- Automotive');
doc.text('- Textiles');
doc.text('- Manufacturing & Logistics');
doc.text('Their solutions are explicitly designed to drive process efficiency and streamline enterprise workflows.', { align: 'justify' });
doc.moveDown();

doc.fontSize(16).fillColor('#0a1931').text('Accelerators & Products');
doc.fontSize(12).fillColor('#333333').text('To reduce time-to-market and lower implementation risks, ITChamps maintains a proprietary knowledgebase that includes:');
doc.text('- A comprehensive suite of SAP Add-on products');
doc.text('- Reusable technical components');
doc.text('- Deployment accelerators');
doc.text('These assets ensure shorter implementation cycles and rapid, reliable deployment for complex enterprise systems.', { align: 'justify' });
doc.moveDown();

doc.fontSize(16).fillColor('#0a1931').text('Education & Training (ITChamps Academy)');
doc.fontSize(12).fillColor('#333333').text('ITChamps holds the distinction of being the only SAP Authorized Education Partner offering FREE Internships.', { align: 'justify' });
doc.text('- Training is led by deeply experienced industry faculty.');
doc.text('- Programs run for 25 days, directly qualifying students to take SAP certification exams.');
doc.text('- The academy offers an online training mode spanning 3 months (200 hours of mentored training), directly within ITChamps premises, bridging the gap between education and enterprise execution.', { align: 'justify' });

doc.end();
console.log('PDF generated successfully');
