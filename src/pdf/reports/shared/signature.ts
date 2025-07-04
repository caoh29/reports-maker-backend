import { Content } from 'pdfmake/interfaces';

interface Props {
  signature?: string[];
  signerName?: string;
}

export const getSignature = ({ signature, signerName }: Props): Content => {
  // If signature is not provided, use a default image
  const signatureImage =
    signature && signature.length > 0
      ? signature[0]
      : signerName
        ? null
        : 'src/assets/70x50.png';

  if (!signatureImage) {
    return '';
  }
  const signatureContent: Content = {
    image: signatureImage,
    width: 70,
    height: 50,
    alignment: 'left',
    marginLeft: 40,
  };

  return {
    columns: [signatureContent],
    // margin: [20, 20, 20, 50],
  };
};
