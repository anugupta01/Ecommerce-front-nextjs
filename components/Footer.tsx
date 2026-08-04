import Link from "next/link";

interface FooterColumn {
  title: string;
  links: string[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Policy Info",
    links: ["Policy Instructions", "Enquiries", "Reviews", "Email us"],
  },
  {
    title: "Company",
    links: ["Company Details", "Company Overview", "Contact", "Email Us"],
  },
  {
    title: "Business Info",
    links: ["Business Enquiry", "Business Information", "Business Talks", "Business Groups"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-light pt-5 pb-4 mt-5 border-top">
      <div className="container">
        <div className="row"> 
          <div className="col-12 col-lg-4 mb-4">
            <h3 className="fw-bold">Fashion Trends</h3>
            <p className="text-muted">
              Fashion is the armour at a particular time, place and context, to
              survive the reality of everyday life.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className="col-6 col-lg-2 mb-4" key={col.title}>
              <h6 className="fw-bold mb-3">{col.title}</h6>
              <ul className="list-unstyled">
                {col.links.map((link) => (
                  <li className="mb-2" key={link}>
                    <Link href="/" className="text-muted text-decoration-none">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
 
        <div className="row justify-content-center my-3">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email Address"
                aria-label="Your email address"
              />
              <button className="btn btn-outline-primary" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
 
        <div className="text-center text-muted pt-3 border-top">
          <p className="mb-0">Copyrights 2026, All Rights Reserved 2026</p>
        </div>
      </div>
    </footer>
  );
}