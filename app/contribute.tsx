export const repoUrl='https://github.com/Pengyu-Zeng666/Pengyu-Zeng666-open-brain-science';

// Invitation to co-create the platform, with a QR code for the GitHub repository.
export default function Contribute(){
  return <section className="contribute">
    <div>
      <div className="kicker">Open source · Open science</div>
      <h2>Build Open Brain Science with us</h2>
      <p>This platform grows with its community. Researchers, clinicians, students and developers are all welcome to help shape it:</p>
      <ul>
        <li>Suggest a neuroimaging database or brain template we have missed</li>
        <li>Correct or update a record, a link or its access status</li>
        <li>Contribute code, design or ideas for the roadmap</li>
      </ul>
      <a className="repo-link" href={repoUrl} target="_blank" rel="noreferrer">Join us on GitHub ↗</a>
    </div>
    <figure>
      <img src="github-qr.svg" alt="QR code linking to the Open Brain Science GitHub repository" width={148} height={148}/>
      <figcaption>Scan to open the GitHub repository</figcaption>
    </figure>
  </section>;
}
