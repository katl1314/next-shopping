'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Text from '@components/atoms/Text';

// 허용할 파일 타입
type FileType =
  | 'image/*'
  | 'image/png'
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/gif'
  | 'video/mp4'
  | 'text/plain'
  | 'application/pdf';

export interface IDropzoneProps {
  id: string; // 고유 이름
  accept?: FileType[]; // 파일 타입
  files?: File[]; // 입력 파일
  width?: number | string; // 드롭존 너비 number타입이면 px, string타입이면 %도 사용할 수 있다.
  height?: number | string; // 드롭존 높이
  onChange?: (file: File[]) => void;
  hasError?: boolean;
}

type SizeType = { width: number | string; height: number | string };

const DropzoneRoot = styled.div<SizeType>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  border: 1px solid black;
  box-sizing: border-box;
`;

const DropzoneInputFile = styled.input`
  display: none;
`;

const DropdownContent = styled.div<SizeType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
`;

const Dropzone = (props: IDropzoneProps) => {
  const { accept, id, width = '100%', height = 300, files = [], onChange } = props;
  const rootRef = useRef<HTMLDivElement>(null); // root영역 접근을 위한 ref
  const inputRef = useRef<HTMLInputElement>(null); // input접근을 위한 ref
  const [fileList, setFileList] = useState<File[]>(files);

  // 드롭존 영역 안에 있을때
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  // 파일이 드롭되었을때 (dropOver필수)
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files: File[] | undefined = getFilesFromEvent(event, accept);

    if (files != undefined) {
      setFileList(files);
      onChange && onChange(files);
    }
  };

  // input 파일 변경 이벤트
  const handleChange = useCallback((event: React.ChangeEvent) => {
    const files: File[] | undefined = getFilesFromEvent(event, accept);

    if (files != undefined) {
      setFileList(files);
      onChange && onChange(files);
    }
  }, []);

  const isDropEvent = (event: unknown): event is React.DragEvent => {
    return typeof event === 'object' && event != null && 'dataTransfer' in event;
  };

  const isInputElement = (target: EventTarget): target is HTMLInputElement => {
    return 'tagName' in target;
  };

  // 파일이 drop했을때와 input에서 change되었을때 동작이 상이함.
  const getFilesFromEvent = (
    event: React.DragEvent | React.ChangeEvent,
    accept?: FileType[],
  ): File[] | undefined => {
    let files: File[] | undefined;

    if (isDropEvent(event)) {
      files = Array.from(event.dataTransfer.files);
    } else if (isInputElement(event.target) && event.target.files) {
      files = Array.from(event.target.files);
    }

    if (files == undefined) return undefined;
    if (accept == null) return files;
    return files.filter(file => accept.includes(file.type as FileType));
  };

  // File배열을 FileList로 변환한다.
  const parseFileToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer(); // File[]에서 FileList 변환
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  useEffect(() => {
    if (inputRef.current != null) {
      if (fileList.length > 0) inputRef.current.files = parseFileToFileList(fileList);
      else inputRef.current.value = ''; // 파일이 없으면 초기화.
    }
  }, [fileList]);

  return (
    <DropzoneRoot
      ref={rootRef}
      width={width}
      height={height}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <DropzoneInputFile
        id={id}
        ref={inputRef}
        type="file"
        accept={accept?.join('|')} // 허용 파일 타입
        multiple // 여러개 업로드
        onChange={handleChange}
      ></DropzoneInputFile>
      <DropdownContent width={width} height={height}>
        <Text textalign="center">기기에서 업로드</Text>
      </DropdownContent>
    </DropzoneRoot>
  );
};

export default Dropzone;
