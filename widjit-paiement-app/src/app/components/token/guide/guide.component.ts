import { Component, ElementRef, Input, Renderer2, ViewChild, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'] // Corrigé: styleUrl -> styleUrls
})
export class GuideComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('sectionToExclude') sectionToExclude!: ElementRef;
  @Input() receivedToken!: string;

  currentLang: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private translate: TranslateService // Ajouté
  ) {
    // Initialiser la langue par défaut
    this.translate.setDefaultLang('fr');
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;

    // Mettre à jour la langue actuelle lors du changement
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void { this.currentLang = this.translate.currentLang;}

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang;
  }

  // Pdf downloading
  loading: boolean = false;

  startLoading() {
    // Set loading to true after a delay of 500 milliseconds
    setTimeout(() => {
      this.loading = true;
      this.downloadPdf();
    });
  }

  downloadPdf() {
    const content = this.content.nativeElement;
    const sectionToExclude = this.sectionToExclude.nativeElement;

    // Increase DPI for better quality
    const dpi = 300; // Adjust as needed

    html2canvas(content, {
      allowTaint: true,
      useCORS: true,
      scale: dpi / 96 // 96 is the default DPI
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Define padding
      const paddingTop = 80; // Adjust as needed

      // Add header image
      const headerImg = new Image();
      headerImg.src = 'assets/img/pdf/header.png'; // Replace with the path to your header image
      headerImg.onload = () => {
        const headerWidth = imgWidth; // Use the full width of the page for the header
        const headerHeight = (headerImg.height * headerWidth) / headerImg.width;
        pdf.addImage(headerImg, 'PNG', 0, 0, headerWidth, headerHeight);

        // Add footer image
        const footerImg = new Image();
        footerImg.src = 'assets/img/pdf/footer.png'; // Replace with the path to your footer image
        footerImg.onload = () => {
          const footerWidth = imgWidth; // Use the full width of the page for the footer
          const footerHeight = (footerImg.height * footerWidth) / footerImg.width;
          const footerY = pdf.internal.pageSize.height - footerHeight; // Position the footer at the bottom of the page
          pdf.addImage(footerImg, 'PNG', 0, footerY, footerWidth, footerHeight);

          // Add content image with padding
          pdf.addImage(imgData, 'PNG', 0, paddingTop, imgWidth, imgHeight);
          pdf.save('token.pdf');

          this.loading = false;
        };
      };
    });
  }

  ///////// Copie number 
  @ViewChild('number', { static: false }) numberElement!: ElementRef;
  isCopied: boolean = false;

  copyNumber() {
    // Create a text node with the value of receivedToken
    const textNode = this.renderer.createText(this.receivedToken || '');
    // Append the text node to the component's native element
    this.renderer.appendChild(this.el.nativeElement, textNode);

    try {
      // Select the text
      const range = document.createRange();
      range.selectNode(textNode);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      
      // Copy the selected text
      document.execCommand('copy');
      
      // Reset isCopied after a certain duration
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000); // 2 seconds

      // Clean up: remove the text node and clear the selection
      window.getSelection()?.removeAllRanges();
      this.renderer.removeChild(this.el.nativeElement, textNode);
    } catch (err) {
      console.error('Unable to copy:', err);
    }
  }
}
