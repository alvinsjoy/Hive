'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useOrganization } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { ThreadValidation } from '@/lib/validations/thread';
import { createThread, editThread } from '@/lib/actions/thread.actions';

interface Props {
  userId: string;
  threadId?: string;
  threadText?: string;
}

function Post({ userId, threadId, threadText }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: threadText || '',
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (threadId && threadText) {
      try {
        await editThread({
          threadId,
          text: values.thread,
          path: pathname,
        });
        router.push('/');
      } catch (error) {
        toast({
          title: '⚠️ Error updating buzz',
          description: 'An error occurred while updating the buzz.',
          variant: 'destructive',
        });
      } finally {
        toast({
          title: '🎉 Buzz updated',
          description: 'Your buzz has been updated successfully.',
          variant: 'default',
        });
      }
    } else {
      try {
        await createThread({
          text: values.thread,
          author: userId,
          communityId: organization ? organization.id : null,
          path: pathname,
        });
        router.push('/');
      } catch (error) {
        toast({
          title: '⚠️ Error posting buzz',
          description: 'An error occurred while posting the buzz.',
          variant: 'destructive',
        });
      } finally {
        toast({
          title: '🎉 Buzz posted',
          description: 'Your buzz has been posted successfully.',
          variant: 'default',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  placeholder="What's on your mind?"
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary-500 hover:bg-muted-500 transition-colors"
        >
          {threadId ? 'Edit' : 'Post a'} Buzz
        </Button>
      </form>
    </Form>
  );
}

export default Post;
