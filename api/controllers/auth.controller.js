import bcrypt from "bcrypt";
import prisma from "../lib/Prisma.js";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET_KEY, {expiresIn: age})

    const age = 1000 * 60 * 60 * 24 * 7;
    res.cookie("token", token, {
        httpOnly:true,
        // secure:true,
       maxAge: age,
    }).status(200).json({message: "Login Successful"})
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Failed to login!"})

}

};

export const logout = (req, res) => {
    // just clear token
    res.clearCookie("token").status(200).json({message: "Logout Successfully"})
};
