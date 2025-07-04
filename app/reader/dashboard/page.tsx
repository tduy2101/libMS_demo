"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, User, Calendar, Star, Search, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ReaderDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock data
  const borrowedBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      dueDate: "2024-01-15",
      status: "borrowed",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      dueDate: "2024-01-20",
      status: "overdue",
    },
  ]

  const borrowHistory = [
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      borrowDate: "2023-12-01",
      returnDate: "2023-12-15",
      rating: 5,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      borrowDate: "2023-11-15",
      returnDate: "2023-11-30",
      rating: 4,
    },
  ]

  const pendingRequests = [
    {
      id: 5,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      requestDate: "2024-01-05",
      status: "pending",
    },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Reader Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link href="/books">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Search Books</h3>
                <p className="text-sm text-gray-600">Find your next read</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/reader/profile">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">My Profile</h3>
                <p className="text-sm text-gray-600">Manage account</p>
              </CardContent>
            </Card>
          </Link>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">Due Soon</h3>
              <p className="text-sm text-gray-600">{borrowedBooks.length} books</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold">My Ratings</h3>
              <p className="text-sm text-gray-600">{borrowHistory.length} rated</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="borrowed" className="space-y-4">
          <TabsList>
            <TabsTrigger value="borrowed">Currently Borrowed</TabsTrigger>
            <TabsTrigger value="history">Borrow History</TabsTrigger>
            <TabsTrigger value="requests">Pending Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Currently Borrowed Books</CardTitle>
                <CardDescription>Books you currently have checked out</CardDescription>
              </CardHeader>
              <CardContent>
                {borrowedBooks.length > 0 ? (
                  <div className="space-y-4">
                    {borrowedBooks.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{book.title}</h4>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                          <p className="text-sm text-gray-500">Due: {book.dueDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={book.status === "overdue" ? "destructive" : "default"}>
                            {book.status === "overdue" ? "Overdue" : "Borrowed"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Renew
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No books currently borrowed</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Borrow History</CardTitle>
                <CardDescription>Your reading history and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                {borrowHistory.length > 0 ? (
                  <div className="space-y-4">
                    {borrowHistory.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{book.title}</h4>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                          <p className="text-sm text-gray-500">
                            Borrowed: {book.borrowDate} - Returned: {book.returnDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{book.rating}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Rate Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No borrow history</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Books you've requested to borrow</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{book.title}</h4>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                          <p className="text-sm text-gray-500">Requested: {book.requestDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Pending</Badge>
                          <Button size="sm" variant="outline">
                            Cancel Request
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No pending requests</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
