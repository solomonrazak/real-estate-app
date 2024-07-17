import bcrypt from "bcrypt";
import prisma from "../lib/Prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //HASH THE PASSWORD

  

 try {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  //CREATE A NEW USER AND SAVE TO THE DATABASE
  const newUser = await prisma.user.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(newUser);
  res.status(201).json({message: "User successfully created"});
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Failed to create user!"})

}
};


export const login = async (req, res) => {
    const {username, password} = req.body;

    try {

    
    //if user exists
    const user = await prisma.user.findUnique({
        where:{username}

    })
    if(!user) return res.status(401).json({message: "Invalid credentials!"});

    //check if passowrd is correct

    // compare password using bcrypt compare method.
    const isPasswordValid  = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({message: "Invalid Credentials!"}); 

    // generate a cookie token and send to the user

    // how to set cookies
    res.setHeader("Set-Cookie", "test" + "myValue")
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Failed to login!"})

}

};

export const logout = (req, res) => {};
