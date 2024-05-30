import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  if (!session) redirect("/login");
  return (
    <main>
      {session?.user && (
        <div className="border flex justify-center gap-2 items-center h-dvh">
          <Image
            src={session?.user?.image!}
            height={100}
            width={100}
            className="rounded"
            alt="image"
          />
          <div className="space-y-1">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
                redirect("/login");
              }}>
              <Button variant={"outline"} size={"sm"}>
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
