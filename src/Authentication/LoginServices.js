
import { supabase } from './Supabase'

export async function SignIn({email, password}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    console.log(error)
    throw new Error('Invalid Email Or Password')
  }
  return data
}

export async function getaUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data?.user;
}


export async function SignUp({ email, password, username }) {
  // 1- تسجيل يوزر جديد في Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // نخزن الـ username في metadata
    },
  });

  if (error) {
    console.error("SignUp Error:", error);
    throw new Error(error.message);
  }

  // 2- ساعات user بيرجع null لو محتاج تأكيد ايميل
  const user = data.user ?? data.session?.user;

  if (user) {
    // 3- استخراج Avatar
    const parts = username.trim().split(" ");
    const avatar =
      parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : username.substring(0, 2).toUpperCase();

    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 4- تأكد إن في profile أو اعمله Upsert
    await supabase.from("profiles").upsert(
      {
        id: user.id, // نفس الـ ID بتاع Supabase Auth
        username,
        random_id: randomId,
        avatar,
      },
      { onConflict: "id" } // لو موجود هيعمل تحديث
    );
  }

  return data;
}


// 🟢 تسجيل دخول / تسجيل جديد بجوجل
export async function authWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://taupe-cascaron-ccacf6.netlify.app/", // غيرها حسب لينك مشروعك
    },
  });

  if (error) {
    console.error("Google Auth Error:", error.message);
    throw new Error(error.message);
  }

  return data; // بيرجع بيانات الـ OAuth
}




export async function SignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}