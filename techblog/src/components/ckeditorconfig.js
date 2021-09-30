import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Link from '@ckeditor/ckeditor5-link/src/link'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Title from '@ckeditor/ckeditor5-heading/src/title'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import List from '@ckeditor/ckeditor5-list/src/list'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

const editorconfig = {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Indent,
    IndentBlock,
    Underline,
    Strikethrough,
    BlockQuote,
    Font,
    Alignment,
    List,
    Link,
    MediaEmbed,
    PasteFromOffice,
    Image,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    SimpleUploadAdapter,
    Table,
    TableToolbar,
    TextTransformation,
    Title,
  ],
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: 'http://localhost:8080/post/images',

    // Enable the XMLHttpRequest.withCredentials property.
    withCredentials: true,

    // Headers sent along with the XMLHttpRequest to the upload server.
    headers: {
      'X-CSRF-TOKEN': 'CSRF-Token',
      Authorization: 'Bearer <JSON Web Token>'
    }
  },
  title: {
    placeholder: 'Title'
  },
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment',
    'outdent',
    'indent',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'link',
    'insertTable',
    'imageUpload',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  heading: {
    options: [
      {
        model: 'paragraph',
        view: 'p',
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      }
    ]
  },
  fontSize: {
    options: [
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      23,
      25,
      27,
      29,
      31,
      33,
      35
    ]
  },
  alignment: {
    options: ['justify', 'left', 'center', 'right']
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:full',
      'imageStyle:alignRight',
      '|',
      'imageTextAlternative'
    ],
    styles: ['full', 'alignLeft', 'alignRight']
  },
  typing: {
    transformations: {
      remove: [
        'enDash',
        'emDash',
        'oneHalf',
        'oneThird',
        'twoThirds',
        'oneForth',
        'threeQuarters'
      ]
    }
  },
  placeholder: 'Click here to start typing'
}


export default editorconfig;