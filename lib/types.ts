export type Preview = {
  title: string;
  description: string;
  image: string;
  url: string;
}

export type Previews = Preview[]

export type Message = {
  text: string;
  previews: Previews
}

export type Messages = Message[]
