'use client';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  threadId: string;
}
const Share = ({ threadId }: Props) => {
  const { toast } = useToast();
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(`${window.location.origin}/thread/${JSON.parse(threadId)}`)
        .then(() =>
          toast({
            title: 'Copied to clipboard 📋',
            description: 'You can now share this buzz with your friends.',
            variant: 'default',
          }),
        )
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          toast({
            title: 'Failed to copy ⚠️',
            description: 'Please try again later.',
            variant: 'destructive',
          });
        });
    }
  };
  return (
    <Image
      src="/assets/share.svg"
      title="Share"
      alt="share"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleShare}
    />
  );
};

export default Share;
