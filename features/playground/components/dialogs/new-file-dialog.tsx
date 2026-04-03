"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (filename: string, extension: string) => void;
}

const NewFileDialog = ({ isOpen, onClose, onCreateFile }: NewFileDialogProps) => {
  const [filename, setFilename] = React.useState("");
  const [extension, setExtension] = React.useState("ts");

  const handleSubmit = () => {
    const trimmedFilename = filename.trim();
    const trimmedExtension = extension.trim().replace(/^\./, "");
    if (!trimmedFilename || !trimmedExtension) return;
    onCreateFile(trimmedFilename, trimmedExtension);
    setFilename("");
    setExtension("ts");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>Provide a file name and extension.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="new-file-name">Filename</Label>
            <Input
              id="new-file-name"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="index"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-file-extension">Extension</Label>
            <Input
              id="new-file-extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              placeholder="ts"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewFileDialog;
