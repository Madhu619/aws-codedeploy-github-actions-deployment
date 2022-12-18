import React from 'react';

const Contact: React.FC = () => {
  return (
      <main className='contact'>
        <div className='text-left'>
          <h1>Divine Collections</h1>
          <h3> Mamatha Residency <br /> Shree Anantha Nagar <br /> Bengaluru: 560100</h3>
          <p><i className='fa fa-envelope'> </i> Email Us : <a href="mailto:divinecollectionsblr@gmail.com"> divinecollectionsblr@gmail.com </a></p>
          <p> <i className='fa fa-phone'> </i>  Call us : <a href="tel:9591734665">9591734665 </a> </p>
        </div>
        <div>
          <iframe title='Contact Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1171076746696!2d77.68594971533814!3d12.835708371317182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6cf8f86a69d5%3A0xfc867e4c4949a061!2sAnanth%20Nagar%2C%20Phase%201%2C%20Kammasandra%2C%20Electronic%20City%2C%20Bengaluru%2C%20Karnataka%20560100!5e0!3m2!1sen!2sin!4v1668412880461!5m2!1sen!2sin" style={{border:"0"}} loading="lazy"></iframe>
        </div>
      </main>
  )
}

export default Contact;