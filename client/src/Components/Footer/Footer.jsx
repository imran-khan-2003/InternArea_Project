import React from 'react'
import "./footer.css"
function Footer() {
  return (
    <div>
        <footer>
<div class="footer">
<div class="row">
<a href="#"><i class="fa fa-facebook"></i></a>
<a href="#"><i class="fa fa-instagram"></i></a>
<a href="#"><i class="fa fa-youtube"></i></a>
<a href="#"><i class="fa fa-twitter"></i></a>

</div>

<div class="row services">
<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">Our Services</a></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div class="row">
INTERNAREA Copyright © {new Date().getFullYear()} InternArea - All rights reserved || Designed By: Imran 
</div>
</div>
</footer>
    </div>
  )
}

export default Footer




