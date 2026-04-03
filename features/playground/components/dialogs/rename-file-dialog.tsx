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

interface RenameFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilename: string;
  currentExtension: string;
  onRename?: (newFilename: string, newExtension: string) => void;
  onRenameFile?: (newFilename: string, newExtension: string) => void;
}

const RenameFileDialog = ({
  isOpen,
  onClose,
  currentFilename,
  currentExtension,
  onRename,
  onRenameFile,
}: RenameFileDialogProps) => {
  const [filename, setFilename] = React.useState(currentFilename);
  const [extension, setExtension] = React.useState(currentExtension);

  React.useEffect(() => {
    if (isOpen) {
      setFilename(currentFilename);
      setExtension(currentExtension);
    }
  }, [isOpen, currentFilename, currentExtension]);

  const handleSubmit = () => {
    const trimmedFilename = filename.trim();
    const trimmedExtension = extension.trim().replace(/^\./, "");
    if (!trimmedFilename || !trimmedExtension) return;

    if (onRename) onRename(trimmedFilename, trimmedExtension);
    if (onRenameFile) onRenameFile(trimmedFilename, trimmedExtension);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Update file name and extension.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="rename-file-name">Filename</Label>
            <Input
              id="rename-file-name"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rename-file-extension">Extension</Label>
            <Input
              id="rename-file-extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFileDialog;
