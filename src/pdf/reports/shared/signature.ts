import { Content } from 'pdfmake/interfaces';

interface Props {
  signature?: string[];
}

export const getSignature = ({ signature }: Props): Content => {
  // If signature is not provided, use a default image
  const signatureImage =
    signature && signature.length > 0 ? signature[0] : 'src/assets/100x100.png';

  const signatureContent: Content = {
    image: signatureImage,
    width: 50,
    height: 50,
    alignment: 'left',
    marginLeft: 20,
  };

  return {
    columns: [signatureContent],
    // margin: [20, 20, 20, 50],
  };
};
